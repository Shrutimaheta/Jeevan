(function() {
	var $ = (window.jQuery || (window.django && window.django.jQuery)) || null;
	function fillFromUserId(val) {
		if (!val) return;
		fetch('/doctor/api/user-info/?user_id=' + encodeURIComponent(val))
			.then(function(r){ return r.json(); })
			.then(function(data){
				if (data && !data.error) {
					var fn = document.getElementById('id_full_name');
					var cn = document.getElementById('id_contact_number');
					var em = document.getElementById('id_email');
					if (fn) fn.value = data.full_name || '';
					if (cn) cn.value = data.contact_number || '';
					if (em) em.value = data.email || '';
				}
			}).catch(function(e){});
	}

	window.populateFullName = function(el) {
		var val = el && el.value;
		fillFromUserId(val);
	};

	function setup() {
		var userSelect = document.getElementById('id_user');
		if (!userSelect) return;
		userSelect.addEventListener('change', function() { populateFullName(this); });
		if ($) {
			$(userSelect).on('change', function(){ populateFullName(this); });
		}
		if (userSelect.value) { populateFullName(userSelect); }
		setTimeout(function(){ if (userSelect && userSelect.value) { populateFullName(userSelect); } }, 300);

		var lastVal = userSelect.value;
		setInterval(function(){
			if (!userSelect) return;
			var v = userSelect.value;
			if (v && v !== lastVal) {
				lastVal = v;
				populateFullName(userSelect);
			}
		}, 500);

		try {
			var originalDismissLookup = window.dismissRelatedObjectLookupPopup;
			window.dismissRelatedObjectLookupPopup = function(win, chosenId) {
				if (typeof originalDismissLookup === 'function') {
					originalDismissLookup(win, chosenId);
				}
				var el = document.getElementById('id_user');
				if (el && el.value) { populateFullName(el); }
			};
		} catch (e) {}

		try {
			var originalDismissAdd = window.dismissAddRelatedObjectPopup;
			window.dismissAddRelatedObjectPopup = function(win, newId, newRepr) {
				if (typeof originalDismissAdd === 'function') {
					originalDismissAdd(win, newId, newRepr);
				}
				setTimeout(function(){
					var el = document.getElementById('id_user');
					if (el && el.value) { populateFullName(el); }
				}, 50);
			};
		} catch (e) {}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup);
	} else { setup(); }
})();
