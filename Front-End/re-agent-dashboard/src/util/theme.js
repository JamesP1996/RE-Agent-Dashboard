import purple from '@material-ui/core/colors/purple';
 const theme =  {
        palette: {
          primary: {
            main: purple[500],
          },
          secondary: {
            main: '#f44336',
          } 
        },
        formstyles:{
          form: {
            textAlign: "center",
          },
          pageTitle: {
            margin: "100px auto 30px auto",
          },
          textField: {
            margin: "10px auto 10px auto",
          },
          button: {
            marginTop: "20px",
            
          },
          customError:{
              color: 'red',
              fontSize: '0.8rem',
              marginTop: '10px',
          },
          progress:{
             margin:"20px auto 20px auto"
          }
        } 
}

export default theme;