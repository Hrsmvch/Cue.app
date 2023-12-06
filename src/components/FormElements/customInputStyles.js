const customStyles = { 
  display: 'block', 
  width: '100%',
  height: '44px', 
  margin: '15px 0',
  padding: "8px",
  outline: "none",
  border: "1px solid #1E1E1E",
  color: '#1E1E1E',
  borderRadius: '8px',
  background: "transparent",
};

const customErrorStyles = { 
  ...customStyles,
  border: '1px solid red',
};

export {customStyles, customErrorStyles};