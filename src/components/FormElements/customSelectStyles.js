const mediaQueryMobile = '@media (max-width: 767px)';

const customStyles = {
  container: (provided) => ({
    ...provided, 
    [mediaQueryMobile]: {
      // minWidth: '100%',
      // fontSize: '14px'
    },
  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #848484',
    backgroundColor: 'transparent',
    color: '#1E1E1E',
    minWidth: '200px',
    minHeight: '44px',
    borderRadius: '8px',
    boxShadow: 'none',
    cursor: 'pointer', 
    [mediaQueryMobile]: { 
      height: '38px',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#e7f2f5' : '#FFFFFF',
    color: state.isFocused ? '#1E1E1E' : '#1E1E1E',
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '44px',
    padding: '0 8px', 
    [mediaQueryMobile]: { 
      height: '38px',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '44px',
    [mediaQueryMobile]: { 
      height: '38px',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#1E1E1E',
    opacity: "0.5",
    marginRight: '6px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1E1E1E',  
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '5px',
    borderRadius: '8px',
    overflow: 'hidden'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'grey',
    borderRadius: '6px',
    padding: '6px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    paddingRight: '10px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgrey',
      color: 'grey'
    },
  }),
};



export default customStyles;