import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, Notifications, BarChart, Report, Schedule, Park, Water, Tree, Clean, Article, Video, Quiz } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Notifications /></ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Report /></ListItemIcon>
          <ListItemText primary="Report Incident" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Schedule /></ListItemIcon>
          <ListItemText primary="Waste Schedule" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Park /></ListItemIcon>
          <ListItemText primary="Parks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Water /></ListItemIcon>
          <ListItemText primary="Water Bodies" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Tree /></ListItemIcon>
          <ListItemText primary="Tree Planting" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Clean /></ListItemIcon>
          <ListItemText primary="Clean-Up Campaigns" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Article /></ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Video /></ListItemIcon>
          <ListItemText primary="Videos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Quiz /></ListItemIcon>
          <ListItemText primary="Quizzes" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;