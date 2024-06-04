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
  
  export default function CarCard(inputProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [carLight, setCarLight] = React.useState(false);
    //let host_endpoint = 'http://172.17.0.16:8001';
    //let host_endpoint = 'http://127.0.0.1:8001';
    let host_endpoint = 'http://rpi9.kouba.xyz:8001';

    function callCarLightApi() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(
            host_endpoint+'/trains/light/'+inputProps.dcc_id+'/'+(!carLight ? 255 : 0),
            requestOptions
        )
        .then(response => response.json())
    }

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleCarLightClick = () => {
        setCarLight(!carLight);
        callCarLightApi();
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
            title={inputProps.car_title}
          />
          <CardMedia
            component="img"
            height="120"
            image={inputProps.car_img}
            alt="Car pic"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {inputProps.under_light === "true" &&
              <>
                <IconButton aria-label="switch lights" onClick={handleCarLightClick}>
                <LightIcon color={carLight ? "success" : "action"}/>
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
                {inputProps.car_details}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
    );
  }  
