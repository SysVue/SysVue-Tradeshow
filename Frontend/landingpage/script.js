function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  function _(str) {
    return document.getElementById(str);
  }
  
  function loginpage() {
    document.location.href = "http://10.52.0.67:5500/SysVue.html";
  }
  function showTermsAndConditions() {
    _('terms').style.scale = "1";
  }
  function acceptTerms() {
  
    _('terms').style.scale = "0";
    _('termsCheckBox').checked = true;
  }
  function closeTerms() {
    _('terms').style.scale = "0";
  }
  function getStart(){
    loginpage();
  }
  
  
  
  
  