(() => {
  const fallback = document.currentScript?.dataset.fallbackImage;
  function ready() {
    // Layouts may include this helper through both a base and a child template.
    if (document.documentElement.dataset.clinicUiReady) return;
    document.documentElement.dataset.clinicUiReady = 'true';
    document.querySelectorAll('.healthcare-sidebar a, .sidebar-container a').forEach(link => {
      const label = (link.querySelector('span')?.textContent || link.textContent || '').replace(/\s+/g, ' ').trim();
      if (!label) return;
      // Collapsed sidebars hide spans visually; keep the action name available.
      if (!link.hasAttribute('aria-label')) link.setAttribute('aria-label', label);
      if (!link.hasAttribute('title')) link.setAttribute('title', label);
    });
    const fixedHeader = document.querySelector('.modern-header');
    if (fixedHeader) {
      const doctorShell = Boolean(document.querySelector('.healthcare-main'));
      document.body.classList.add(doctorShell ? 'clinic-doctor-shell' : 'clinic-fixed-header');
      const resizeHeader = () => document.documentElement.style.setProperty('--clinic-header-height', `${Math.ceil(fixedHeader.getBoundingClientRect().height)}px`);
      resizeHeader();
      new ResizeObserver(resizeHeader).observe(fixedHeader);
    }
    const main = document.querySelector('main, .main-content-with-sidebar, .main-content');
    if (main) {
      if (!main.id) main.id = 'clinic-main-content';
      main.setAttribute('tabindex', '-1');
      const skip = document.createElement('a');
      skip.className = 'clinic-skip-link';
      skip.href = '#' + main.id;
      skip.textContent = 'Skip to main content';
      if (!document.querySelector('.skip-link,.clinic-skip-link')) document.body.prepend(skip);
    }
    document.querySelectorAll('table').forEach((table, index) => {
      const columns = Math.max(0, ...Array.from(table.rows).map(row =>
        Array.from(row.cells).reduce((count, cell) => count + cell.colSpan, 0)));
      if (columns >= 5) table.classList.add('clinic-wide-table');
      if (table.closest('.table-responsive, .clinic-table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'clinic-table-scroll';
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', table.getAttribute('aria-label') || `Scrollable data table ${index + 1}`);
      table.before(wrapper);
      wrapper.append(table);
    });
    document.querySelectorAll('.table-responsive,.clinic-table-scroll').forEach((wrapper, index) => {
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      if (!wrapper.getAttribute('aria-label')) wrapper.setAttribute('aria-label', `Scrollable data table ${index + 1}`);
      if (wrapper.querySelector('.clinic-wide-table') && !wrapper.previousElementSibling?.classList.contains('clinic-table-hint')) {
        const hint = document.createElement('p');
        hint.className = 'clinic-table-hint';
        hint.textContent = 'Scroll horizontally to see all columns.';
        wrapper.before(hint);
      }
    });
    document.querySelectorAll('img').forEach(img => {
      function recover() {
        if (!fallback || img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        img.src = fallback;
        img.style.objectFit = 'contain';
      }
      img.addEventListener('error', recover, {once: true});
      if (img.complete && !img.naturalWidth) recover();
    });
    document.querySelectorAll('.form-group, .mb-3').forEach((group, index) => {
      const input = group.querySelector('input:not([type=hidden]),select,textarea');
      const label = group.querySelector('label');
      if (!input) return;
      if (!input.id) input.id = `clinic-field-${index}`;
      if (label && !label.htmlFor) label.htmlFor = input.id;
      const errors = group.querySelector('.errorlist,.invalid-feedback,.error-msg');
      if (errors && errors.textContent.trim()) {
        if (!errors.id) errors.id = `clinic-error-${index}`;
        input.setAttribute('aria-invalid', 'true');
        const descriptions = new Set((input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
        descriptions.add(errors.id);
        input.setAttribute('aria-describedby', [...descriptions].join(' '));
      }
    });
    document.querySelectorAll('.sidebar-toggle, .navbar-toggler').forEach(button => {
      if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', 'Toggle navigation');
      const target = document.getElementById(button.getAttribute('aria-controls')) || document.querySelector('#sidebarContainer,.healthcare-sidebar');
      if (!target) return;
      if (target.id) button.setAttribute('aria-controls', target.id);
      const navbar = target.matches('.navbar-collapse');
      const expansion = button.closest('.navbar')?.className.match(/navbar-expand(?:-(sm|md|lg|xl|xxl))?(?:\s|$)/);
      const navbarBreakpoint = expansion ? ({sm: 575, md: 767, lg: 991, xl: 1199, xxl: 1399}[expansion[1]] ?? -1) : 100000;
      const breakpoint = navbar ? navbarBreakpoint : target.matches('.healthcare-sidebar') ? 768 : 1024;
      const sync = () => {
        const mobile = window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
        const expanded = mobile ? target.classList.contains('open') || target.classList.contains('show') : !target.classList.contains('collapsed');
        button.setAttribute('aria-expanded', String(expanded));
        // Off-screen mobile navigation must not capture keyboard focus.
        target.inert = mobile && !expanded;
        if (mobile && !expanded) target.setAttribute('aria-hidden', 'true');
        else target.removeAttribute('aria-hidden');
      };
      new MutationObserver(sync).observe(target, {attributes: true, attributeFilter: ['class']});
      sync();
      window.addEventListener('resize', sync);
      document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || button.getAttribute('aria-expanded') !== 'true') return;
        if (!window.matchMedia(`(max-width: ${breakpoint}px)`).matches) return;
        if (navbar && window.bootstrap?.Collapse) {
          window.bootstrap.Collapse.getOrCreateInstance(target, {toggle: false}).hide();
        } else target.classList.remove('open', 'show');
        sync();
        button.focus();
      });
    });
    document.querySelectorAll('form[data-selection-required]').forEach(form => {
      const submit = form.querySelector('button[type=submit]');
      const status = form.querySelector('[data-selection-status]');
      if (!submit || !status) return;
      const sync = () => {
        const eligible = form.querySelectorAll('input[name=patient_ids]:not(:disabled)').length;
        const selected = form.querySelectorAll('input[name=patient_ids]:checked:not(:disabled)').length;
        submit.disabled = selected === 0;
        status.textContent = !eligible ? 'No patients currently have active consent for export.' : selected ? `${selected} patient${selected === 1 ? '' : 's'} selected for export.` : 'Select at least one patient with active consent to enable export.';
      };
      form.addEventListener('change', sync);
      sync();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
