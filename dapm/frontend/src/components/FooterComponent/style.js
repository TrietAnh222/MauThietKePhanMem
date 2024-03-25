const footerStyles = {
  ".footer-basic": {
    padding: "40px 0",
    backgroundColor: "#ffffff",
    color: "#4b4c4d",
  },
  ".footer-basic ul": {
    padding: "0",
    listStyle: "none",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "0",
  },
  ".footer-basic li": {
    padding: "0 10px",
  },
  ".footer-basic ul a": {
    color: "inherit",
    textDecoration: "none",
    opacity: "0.8",
  },
  ".footer-basic ul a:hover": {
    opacity: "1",
  },
  ".footer-basic .social": {
    textAlign: "center",
    paddingBottom: "25px",
  },
  ".footer-basic .social > a": {
    fontSize: "24px",
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    display: "inline-block",
    textAlign: "center",
    borderRadius: "50%",
    border: "1px solid #ccc",
    margin: "0 8px",
    color: "inherit",
    opacity: "0.75",
  },
  ".footer-basic .social > a:hover": {
    opacity: "0.9",
  },
  ".footer-basic .copyright": {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "13px",
    color: "#aaa",
    marginBottom: "0",
  },
};

// Áp dụng các quy tắc CSS vào các phần tử HTML tương ứng
Object.keys(footerStyles).forEach(selector => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    Object.assign(...Array.from(elements, el => el.style), footerStyles[selector]);
  }
});