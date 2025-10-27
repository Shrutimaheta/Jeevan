(function() {
	var $ = (window.jQuery || (window.django && window.django.jQuery)) || null;
	function fillFromUserId(val) {
		if (!val) return;
		try { console.debug('[doctor autofill] fetching user', val); } catch(e){}
		fetch('/doctor/api/user-info/?user_id=' + encodeURIComponent(val))
			.then(function(r){ return r.json(); })
			.then(function(data){
				if (data && !data.error) {
					var fn = document.getElementById('id_full_name');
					var cn = document.getElementById('id_contact_number');
					var em = document.getElementById('id_email');
					if (fn) { fn.value = data.full_name || ''; try{ fn.dispatchEvent(new Event('input', {bubbles:true})); }catch(e){} }
					if (cn) { cn.value = data.contact_number || ''; try{ cn.dispatchEvent(new Event('input', {bubbles:true})); }catch(e){} }
					if (em) { em.value = data.email || ''; try{ em.dispatchEvent(new Event('input', {bubbles:true})); }catch(e){} }
					try { console.debug('[doctor autofill] filled', {full_name:data.full_name, contact:data.contact_number, email:data.email}); } catch(e){}
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
		userSelect.addEventListener('change', function() {
			// slight delay in case the widget updates asynchronously
			var el = this;
			try { console.debug('[doctor autofill] change event on #id_user', el && el.value); } catch(e){}
			setTimeout(function(){ populateFullName(el); }, 0);
		});
		if ($) {
			$(userSelect).on('change', function(){
				var el = this;
				try { console.debug('[doctor autofill] jQuery change on #id_user', el && el.value); } catch(e){}
				setTimeout(function(){ populateFullName(el); }, 0);
			});
		}

		// Also delegate in case the select is re-rendered by admin widgets
		document.addEventListener('change', function(e){
			if (e && e.target && e.target.id === 'id_user') {
				var el = e.target;
				try { console.debug('[doctor autofill] delegated change on #id_user', el && el.value); } catch(e){}
				setTimeout(function(){ populateFullName(el); }, 0);
			}
		}, true);

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


