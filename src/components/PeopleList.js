import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { fetchVehicles } from "../store/slices/vehiclesSlice";
import VehiclesDialog from "./VehiclesDialog";
import { format } from "date-fns";

const PeopleList = () => {
  const dispatch = useDispatch();
  const { people, loading, error } = useSelector(state => state.people);
  const [openDialog, setOpenDialog] = useState(false);

  const handleShowVehicles = vehicleUrls => {
    dispatch(fetchVehicles(vehicleUrls));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <List>
        {people.map(person => (
          <ListItem key={person.name}>
            <ListItemText
              primary={person.name}
              secondary={`Height: ${person.height} cm, Mass: ${person.mass} kg, Gender: ${person.gender}, Edited: ${format(new Date(person.edited), "MM/dd/yyyy")}`}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleShowVehicles(person.vehicles)}
                disabled={person.vehicles.length === 0}
              >
                Show Vehicles
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <VehiclesDialog open={openDialog} onClose={handleCloseDialog} />
    </div>
  );
};

PeopleList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      mass: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      edited: PropTypes.string.isRequired,
      vehicles: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default PeopleList;
