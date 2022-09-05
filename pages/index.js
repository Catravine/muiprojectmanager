import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import EnhancedTable from '../src/ui/EnhancedTable';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme =>({
  service: {
    fontWeight: 300
  },
  users: {
    marginRight: 0
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  }
}));

function createData(name, date, service, features, complexity, platforms, users, total, search) {
  return { name, date, service, features, complexity, platforms, users, total, search }
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [rows, setRows] = useState([
    createData("Caroline Courtney", "11/02/29", "Website", "N/A", "N/A", "N/A", "N/A", "$1500", true),
    createData("Bill Gates", "10/27/19", "Custom Software", "GPS, Push Notifications, Users/Authentication, File Transfer", "Medium", "Web Application", "0-10", "$1600", true),
    createData("Steve Jobs", "02/13/19", "Custom Software", "Photo/Video, File Transfer, Users/Authentication", "Low", "Website, Android", "10-100", "$1250", true)
  ]);

  const platformOptions = ["Web", "iOS", "Android"];
  var featureOptions = ["Photo/Video", "GPS", "File Transfer", "Users/Authentication", "Biometrics", "Push Notifications"]
  var websiteOptions = ["Basic", "Interactive", "E-Commerce"]

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = React.useState(0);

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const addProject = () => {
    setRows([...rows, createData(
      name, 
      format(date, "MM/dd/yyyy"), 
      service, 
      features.join(", "), 
      service === "Website" ? "N/A" : complexity, 
      service === "Website" ? "N/A" : platforms.join(", "), 
      service === "Website" ? "N/A" : users, 
      `$${total}`,
      true
    )]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setTotal('');
    setService('');
    setComplexity('');
    setUsers('');
    setPlatforms([]);
    setFeatures([]);
  }
  
  const handleSearch = event => {
    setSearch(event.target.value);
    const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !== false));
    const matches = rowData.map(row => row.map(option => 
      option.toLowerCase().includes(event.target.value.toLowerCase())
    ));
    const newRows = [...rows]
    matches.map((row, index) => row.includes(true) ? newRows[index].search = true : newRows[index].search = false)
    setRows(newRows);
    setPage(0);
  }

  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container direction="column" alignItems={matchesSM ? "center" : undefined}>
      <Grid item style={{marginTop: "2em", marginLeft: matchesSM ? 0 : "5em"}}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField 
          placeholder = "Search Project Details or create a new entry."
          value={search}
          onChange={handleSearch}
          style={{width: matchesSM ? "25em" : "35em", marginLeft: matchesSM ? 0 : "5em"}} 
          InputProps={{
            endAdornment: 
              <InputAdornment 
                position="end" 
                style={{cursor: "pointer"}}
                onClick={() =>  setDialogOpen(true)}
              >
                <AddIcon color="primary" style={{fontSize: 30}} />
              </InputAdornment>
            }
          } 
        />
      </Grid>
      <Grid item style={{marginLeft: matchesSM ? 0 : "5em", marginTop: "2em"}}>
        <FormGroup row>
          <Grid 
            container 
            direction={matchesSM ? "column" : "row"} 
            justifyContent={matchesSM ? "center" : undefined}
          >
            <Grid item>
              <FormControlLabel control={
                <Switch 
                  checked={websiteChecked} 
                  color="primary" 
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />} 
                label="Websites" 
                labelPlacement={matchesSM ? 'end' : 'start'}
                style={{marginRight: matchesSM ? 0 : "5em"}}
              />
            </Grid>
            <Grid item>
              <FormControlLabel control={
                <Switch 
                  checked={iOSChecked} 
                  color="primary" 
                  onChange={() => setIOSChecked(!iOSChecked)}
                />} 
                label="iOS Apps" 
                labelPlacement={matchesSM ? 'end' : 'start'}
                style={{marginRight: matchesSM ? 0 : "5em"}}
              />
            </Grid>
            <Grid item>
              <FormControlLabel control={
                <Switch 
                  checked={androidChecked} 
                  color="primary" 
                  onChange={() => setAndroidChecked(!androidChecked)}
                />} 
                label="Android Apps" 
                labelPlacement={matchesSM ? 'end' : 'start'}
                style={{marginRight: matchesSM ? 0 : "5em"}}
              />
            </Grid>
            <Grid item>
              <FormControlLabel control={
                <Switch 
                  checked={softwareChecked} 
                  color="primary" 
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />} 
                label="Custom Software" 
                labelPlacement={matchesSM ? 'end' : 'start'}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
      <Grid item style={{
        marginBottom: matchesMD ? "40em" : "35em", 
        marginTop: "5em",
        maxWidth: "100%"
      }}>
        <EnhancedTable 
          rows={rows} 
          page={page} 
          setPage={setPage} 
          setRows={setRows} 
          websiteChecked={websiteChecked}
          iOSChecked={iOSChecked}
          androidChecked={androidChecked}
          softwareChecked={softwareChecked}
        />
      </Grid>
      <Dialog fullWidth maxWidth="md" open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h1" gutterBottom>
              Add a new project
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Grid item container direction="column" sm>
                <Grid item>
                  <TextField 
                    label="Name" 
                    id="name" 
                    fullWidth
                    value={name} 
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
                <Grid item container direction="column" style={{marginTop: "5em"}}>
                  <Grid item>
                    <Typography variant="h4">Service</Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup 
                      aria-label="service" 
                      name="service" 
                      value={service} 
                      onChange={event => { 
                        setService(event.target.value); 
                        setFeatures([]); 
                      }}
                    >
                      <FormControlLabel classes={{label: classes.service}} value="Website" label="Website" control={<Radio />} />
                      <FormControlLabel classes={{label: classes.service}} value="Mobile App" label="Mobile App" control={<Radio />} />
                      <FormControlLabel classes={{label: classes.service}} value="Custom Software" label="Custom Software" control={<Radio />} />
                    </RadioGroup>
                  </Grid>
                  <Grid item style={{marginTop: "5em"}}>
                    <Select 
                      style={{width: "12em"}}
                      disabled={service === "Website"} 
                      labelId="platforms" 
                      id="platforms" 
                      multiple 
                      displayEmpty
                      renderValue={platforms.length > 0 ? undefined : () => "Platforms"}
                      value={platforms} 
                      onChange={event => setPlatforms(event.target.value)}
                    >
                      {platformOptions.map(option => 
                        <MenuItem 
                          key={option} 
                          value={option}
                        >
                          {option}
                        </MenuItem>
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container direction="column" sm style={{marginTop: 16}} alignItems="center">
                <Grid item>
                  <KeyboardDatePicker 
                    format="MM/dd/yyyy" 
                    value={date} 
                    onChange={newDate => setDate(newDate)}
                  />
                </Grid>
                <Grid item>
                  <Grid item container direction="column" style={{marginTop: "5em"}}>
                    <Grid item>
                      <Typography variant="h4">Complexity</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup 
                        aria-label="complexity" 
                        name="complexity" 
                        value={complexity} 
                        onChange={event => setComplexity(event.target.value)}
                      >
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service}} value="Low" label="Low" control={<Radio />} />
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service}} value="Medium" label="Medium" control={<Radio />} />
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service}} value="High" label="High" control={<Radio />} />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container direction="column" sm>
                <Grid item>
                  <TextField 
                    InputProps={{startAdornment: 
                      <InputAdornment position="start">$</InputAdornment>
                    }}
                    label="Total" 
                    id="total" 
                    value={total} 
                    onChange={(event) => setTotal(event.target.value)}
                  />
                </Grid>
                <Grid item style={{alignSelf: "flex-end"}}>
                  <Grid 
                    item 
                    container 
                    direction="column" 
                    style={{marginTop: "5em"}}
                  >
                    <Grid item>
                      <Typography variant="h4">Users</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup 
                        aria-label="users" 
                        name="users" 
                        value={users} 
                        onChange={event => setUsers(event.target.value)}
                      >
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service, root: classes.users}} value="0-10" label="0-10" control={<Radio />} />
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service, root: classes.users}} value="10-100" label="10-100" control={<Radio />} />
                        <FormControlLabel disabled={service === "Website"} classes={{label: classes.service, root: classes.users}} value="100+" label="100+" control={<Radio />} />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{marginTop: "5em"}}>
                  <Select 
                    MenuProps={{ style: {zIndex: 1302}}}
                    labelId="features" 
                    id="features" 
                    style={{width: "12em"}}
                    multiple 
                    displayEmpty
                    renderValue={features.length > 0 ? undefined : () => "Features"}
                    value={features} 
                    onChange={event => setFeatures(event.target.value)}
                  >
                    {service === "Website" ? featureOptions = websiteOptions : null}
                    {featureOptions.map(option => 
                      <MenuItem 
                        key={option} 
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    )}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' style={{marginTop: "3em"}}>
            <Grid item>
              <Button 
                color="primary" 
                style={{fontWeight: 300}} 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                className={classes.button} 
                onClick={addProject}
                disabled={
                  service === "Website" ? 
                    name.length === 0 || total.length === 0 || features.length === 0 || features.length > 1
                  : 
                    name.length === 0 || total.length === 0 || features.length === 0 || 
                    users.length === 0 || complexity.length === 0 || platforms.length === 0 || 
                    features.length === 0 || service.length === 0
                }
              >
                Add Project +
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  </MuiPickersUtilsProvider>
}