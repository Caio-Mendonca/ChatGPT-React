import { Configuration, OpenAIApi } from "openai";
import { OptionQA} from "./AIOptions";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  const option = OptionQA.option;
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [ loadgin, setLoading] = useState(false);
  // console.log(import.meta.env.VITE_Open_AI_Key);

  useEffect(()=>{
    if(result){
      setLoading(false)
    }
  }, [result])

  const doStuff = async () => {
    let object = { ...option, prompt: input };
    setLoading(true)
    const response = await openai.createCompletion(object);
    setResult(response.data.choices[0].text);
  };

  return (
    <body>
      <Box sx={{  width: '100%', margin: 0, padding: 0}}>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', marginTop: 2, marginBottom: 2}}>
          <img src="/logo.png" style={{ width: '80%', maxWidth: '350px'}}/>  
        </Box>

        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
          <TextField
            rows={4}
            type="text"
            multiline
            label="Faça sua pergunta:"
            sx={{ width: '80%' }}
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
        <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 2}}> 
          <Button 
          variant="contained"
          style={{backgroundColor: loadgin ?'#c8c8c8':'#16315C', color: loadgin ? '#16315C' : '#fff'}}
          disabled={loadgin}
          onClick={doStuff}>
            Noomi responde
          </Button>
        </Box>

        <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 2, width: '100%'}}>
            { !loadgin ? (
              <Box>
                <Typography 
                sx={{justifyContent: 'center', alignItems: 'center', display: 'flex',margin: 'auto', width: '70%', textAlign: 'center'}}
                variant="h6"
                component="p"
                color="grey.600"
                >{result.length > 0 ? result : ""}
                </Typography>
              </Box>
            ) : (    
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>)}
          </Box>
      </Box>
      </body>
  );
}

export default App;