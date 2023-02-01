import { Configuration, OpenAIApi } from "openai";
import { OptionQA} from "./AIOptions";
import { useEffect, useState, useCallback } from "react";
import { Box, Button, TextField, Typography,ListItem,useMediaQuery, IconButton, List } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { StyleList } from './style'
function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const theme = createTheme({
    palette: {
      primary:{
        main: "#16315C",
        dark: "#D9D9D9",
      },
      secondary: {
        main: "#F4A711",
      }
    },
  });
  const openai = new OpenAIApi(configuration);
  const option = OptionQA.option;
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [ loadgin, setLoading] = useState(false);
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [ messages, setMessages] = useState([]);
  const [ currentId, setCurrenteId] = useState(0);
  const [errorField, setErrorField] = useState(false);
  // console.log(import.meta.env.VITE_Open_AI_Key);

  useEffect(()=>{
    if(result){
      setLoading(false)
    }
  }, [result])
  const handleKeyPress = useCallback(event => {
    if (event.key === 'Enter') {
      document.getElementById('buttonChat').click()
    }
  }, [])
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    const oldMessages = JSON.parse(localStorage.getItem('messages'))
    if(oldMessages){
      setMessages(oldMessages)
    }
  },[])
  const doStuff = async () => {

    if (input === ""){
      setErrorField(true)
      return
    }
    let object = { ...option, prompt: input };
    setErrorField(false)
    setLoading(true)
    setInput('')
    const id = messages.length + 1
    const newMessage = {
      id: id,
      message: {
        user: input,
        bot: "Um momento, por favor...",
      },
    }
    setCurrenteId(id-1)
    setMessages([...messages, newMessage])

    const response = await openai.createCompletion(object);
    const responseData = response.data.choices[0].text
    setResult(responseData);
  };
  useEffect(()=>{
    if(messages.length > 0){
      localStorage.setItem('messages', JSON.stringify(messages))

    }
  }, [messages])
  useEffect(()=>{
    if(result){
      const oldMessages = [...messages]
      oldMessages[currentId].message.bot = result
      setMessages(oldMessages)
      }
  }, [result])
  function handleCleanMessages(){
    setMessages([])
    localStorage.clear()
  }
  return (
    <ThemeProvider theme={theme}>
    <body>
      <Box sx={{  width: '90vw', height:'90vh', margin: 'auto', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1000px'}}>
        <Box sx={{  width: smDown ? '100%' : '80%'}}>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', marginTop: smDown ? 10 : 5, marginBottom: smDown ? 5 : 10}}>
          <img src="/logo.png" style={{ width: '70%', maxWidth: '300px', maxHeight: '300px'}}/>  
        </Box>
        { messages.length > 0 ? (
        <Box sx={{display:'flex', alignItems:'flex-end'}}>
          <div style={{ display: 'flex', alignItems:'flex-end', width: '100%', minHeight: '60vh'}}>

          <List sx={StyleList} id='myElement'>
            {messages.map((item) => (
              <>
              <ListItem key={item.id}>
                <Box sx={{width: '100%'}}>
                  <Box sx={{justifyContent: 'flex-end', alignItems: 'center', display: 'flex', width:'100%', margin:1}}>
                    <Box sx={{ backgroundColor: "#16315C", borderRadius:2, display: 'flex', padding: 1 }}>
                        <Typography 
                        sx={{justifyContent: 'center', alignItems: 'center', display: 'flex',margin: 'auto', width: '100%', textAlign: 'start'}}
                        variant="h7"
                        component="p"
                        color="white"
                        >{item.message.user}
                        </Typography>
                    </Box>
                    <div style={{width: 5,marginTop: '-18px', marginRight: '5px', marginLeft:'-8px', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid #16315C'}}/>
                  </Box>
                  <Box sx={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex', width:'100%', margin:1}}>

                    <div  style={{width: 5,marginTop: '-18px',  marginRight:'-5px', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '15px solid #D9D9D9'}}/>

                    <Box sx={{ backgroundColor: "#D9D9D9", borderRadius:2, display: 'flex', padding: 1 }}>
                      <Typography 
                      sx={{justifyContent: 'center', alignItems: 'center', display: 'flex',margin: 'auto', width: '100%', textAlign: 'start'}}
                      variant="h7"
                      component="p"
                      color="primary"
                      >
                        {item.message.bot}
                      </Typography>
                    </Box>

                  </Box>
                </Box>
              </ListItem>
              </>
            ))}
            
          </List>
          </div>
        </Box>) : (<></>)}
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        { messages.length > 0 ? (
          <Button  variant="outlined" color="secondary" sx={{marginBottom: 2}} onClick={()=> handleCleanMessages()}>Limpar histórico</Button>
        ) : (<></>)}
        </Box>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', borderRadius: '10px'}}>
          <TextField
            type="text"
            color="primary"
            borderColor="#102F5D"
            label="O que deseja saber?"
            value={input}
            InputProps={{
              style: { textAlign: 'center', borderRadius: '50px',  borderColor: "#102F5D" }
            }}
            InputLabelProps={{
              style: { textAlign: 'center', color: "#102F5D", borderColor: "#102F5D"},
            }}
            inputStyle={{ textAlign: 'center', backgroundColor: 'white', color: "#102F5D" }}
            style={{ width: '80%', borderColor: "#102F5D" }}
            error={errorField}
            onChange={(e) => setInput(e.target.value)}
          />
          <Box sx={{border: " 1px solid #16315C", borderRadius: 50, marginLeft: 2}} >
            <IconButton onClick={doStuff} disabled={loadgin} id="buttonChat" >
                <SearchIcon color="secondary"/>
            </IconButton>
          </Box>
        </Box>
        </Box>
      </Box>
    </body>
    </ThemeProvider>
  );
}

export default App;