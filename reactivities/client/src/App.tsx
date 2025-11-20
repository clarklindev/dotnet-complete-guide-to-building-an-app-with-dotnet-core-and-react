import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(()=> {

    async function fetchActivities(){
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      setActivities(response.data);
    }
    fetchActivities(); 

    return ()=> {

    }

  }, []);

  return (
    <>
      <Typography variant='h3'>Reactivities</Typography>
      <List>
        {activities.map((activity) => {
          return <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        })}
      </List>
    </>
  )
}

export default App
