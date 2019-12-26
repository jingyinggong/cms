const Utils = {
  isEmail(email) {
    return email && /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email);
  }
}

export default Utils;