const mediaQueryMobile = '@media (max-width: 767px)';

const customStyles = {
  container: (provided) => ({
    ...provided, 
    [mediaQueryMobile]: {
      minWidth: '100%',
      fontSize: '14px'
    },
  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #1E1E1E',
    backgroundColor: 'transparent',
    color: '#1E1E1E',
    minWidth: '370px',
    height: '40px',
    borderRadius: '10px',
    boxShadow: 'none',
    cursor: 'pointer',
    ':hover': {
      borderColor: '#1E1E1E',
    },
    [mediaQueryMobile]: {
      minWidth: '100%',
      
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#4a634b' : '#FFFFFF',
    color: state.isFocused ? '#FFFFFF' : '#1E1E1E',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '40px',
    padding: '0 25px', 
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '40px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#1E1E1E',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1E1E1E',  
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '5px',
    borderRadius: '20px',
    overflow: 'hidden'
  }),

  
};



export default customStyles;