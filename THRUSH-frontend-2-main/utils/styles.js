import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    card: {
        margin: 15,
    },
    nameWeb: {
        fontFamily: 'BlinkMacSystemFont',
        fontSize: 40,
    },
    main: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row', 
        marginTop: 20
    },
    
    filterbar:{
        marginLeft: 20,
    },

    filterbarTitle:{
        fontSize: 50
    },

    fabCart:{
        margin: 30
        
    }, 

    wrapper :{
        padding: "5 20"
        
    },

    wFieldset :{
        margin: "20 0"
    }
})


export default useStyles