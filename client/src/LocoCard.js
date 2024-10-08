import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LightIcon from '@mui/icons-material/Light';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import HighlightIcon from '@mui/icons-material/Highlight';
import TrainIcon from '@mui/icons-material/Train';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function LocoCard(inputProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [locoLight, setLocoLight] = React.useState(false);
  const [locoHeadlight, setLocoHeadlight] = React.useState(false);
  const [locoRunning, setLocoRunning] = React.useState(false);
  const [locoMuted, setLocoMuted] = React.useState(true);
  //let host_endpoint = 'http://172.17.0.16:8001';
  //let host_endpoint = 'http://127.0.0.1:8001';
  let host_endpoint = 'http://rpi9.kouba.xyz:8001';

  function callLocoLightApi() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      host_endpoint + '/trains/light/' + inputProps.dcc_id + '/' + (!locoLight ? 255 : 0),
      requestOptions
    )
      .then(response => response.json())
  }

  function executeShortDCCCmd(cmd_number, value) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      host_endpoint + '/trains/dcc/' + inputProps.dcc_id + '/' + cmd_number + '/' + value,
      requestOptions
    )
      .then(response => response.json())
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLocoLightClick = () => {
    setLocoLight(!locoLight);
    callLocoLightApi();
  };

  const handleHornClick = () => {
    executeShortDCCCmd(2, 1);
    setTimeout(() => {
      executeShortDCCCmd(2, 0);
    }, 1000)
  };

  const handleHeadlightClick = () => {
    setLocoHeadlight(!locoHeadlight);
    executeShortDCCCmd(0, (!locoHeadlight ? 1 : 0));
  };

  const handleRunningClick = () => {
    setLocoRunning(!locoRunning);
    executeShortDCCCmd(16, (!locoRunning ? 1 : 0));
  };

  const handleUnmuteClick = () => {
    setLocoMuted(!locoMuted);
    executeShortDCCCmd(8, (!locoMuted ? 1 : 0));
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 345, maxWidth: 345, display: "inline-block", verticalAlign: "top" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {inputProps.dcc_id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={inputProps.loco_title}
      />
      <CardMedia
        component="img"
        height="120"
        image={inputProps.loco_img}
        alt="Loco pic"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="switch lights" onClick={handleLocoLightClick}>
          <LightIcon color={locoLight ? "success" : "action"} />
        </IconButton>
        <IconButton aria-label="headlight" onClick={handleHeadlightClick}>
          <HighlightIcon color={locoHeadlight ? "success" : "action"} />
        </IconButton>
        {inputProps.sound === "true" &&
          <>
            <IconButton aria-label="running" onClick={handleRunningClick}>
              <TrainIcon color={locoRunning ? "success" : "action"} />
            </IconButton>
            <IconButton aria-label="horn" onClick={handleHornClick}>
              <VolumeUpIcon />
            </IconButton>
          </>
        }
        {inputProps.unmute_function &&
          <>
            <IconButton aria-label="muted" onClick={handleUnmuteClick}>
              <VolumeOffIcon />
            </IconButton>
          </>
        }
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {inputProps.loco_details}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}  
