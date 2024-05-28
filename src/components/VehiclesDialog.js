import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

const VehiclesDialog = ({ open, onClose }) => {
  const { vehicles, loading, error } = useSelector(state => state.vehicles);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Vehicles</DialogTitle>
      <List>
        {loading && <ListItem>Loading...</ListItem>}
        {error && <ListItem>Error: {error}</ListItem>}
        {vehicles.map(vehicle => (
          <ListItem key={vehicle.name}>
            <ListItemText
              primary={vehicle.name}
              secondary={`Model: ${vehicle.model}, Manufacturer: ${vehicle.manufacturer}, Class: ${vehicle.vehicle_class}`}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

VehiclesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default VehiclesDialog;
