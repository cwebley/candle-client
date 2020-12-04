import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";

import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";

import FragranceOilForm from "./resource-types/FragranceOilForm";
import JarForm from "./resource-types/JarForm";
import LidForm from "./resource-types/LidForm";
import BoxForm from "./resource-types/BoxForm";
import DyeForm from "./resource-types/DyeForm";
import WaxForm from "./resource-types/WaxForm";
import AdditiveForm from "./resource-types/AdditiveForm";
import WickForm from "./resource-types/WickForm";
import WickStickerForm from "./resource-types/WickStickerForm";
import WarningLabelForm from "./resource-types/WarningLabelForm";
import MiscEquipmentForm from "./resource-types/MiscEquipmentForm";

import { currentDate } from "./utils";
import ItemTable from "./ItemTable";

import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import axios from "axios";

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  paper: {
    padding: theme.spacing(2),
    // display: "flex",
    // justifyContent: "center",
    // flexFlow: "wrap"
  },
  textField: {
    marginTop: "1em",
  },
  iconButton: {
    borderRadius: 0,
  },
  dialogContent: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  heading: {
    padding: theme.spacing(2),
  },
  orderInfoSection: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
  },
  costSection: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },
  formActions: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  submitButton: {
    padding: theme.spacing(1),
  },
});

function NewOrder({ history, location, enqueueSnackbar, classes }) {
  const [resourceTypes, setResourceTypes] = useState([]);
  const [fragranceOilCategories, setFragranceOilCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [fragranceOptions, setFragranceOptions] = useState([]);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  const removeItem = (index) => {
    setValues((values) => {
      const newItems = [
        ...values.items.slice(0, index),
        ...values.items.slice(index + 1),
      ];
      return { ...values, items: newItems };
    });
  };

  const editItem = (index) => {
    setItemEditIndex(index);
    setNewItemValues(values.items[index]);
    setItemDialogOpen(true);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    console.log("values: ", values);

    try {
      const result = await axios.post(
        "http://localhost:5000/supply-orders",
        values
      );
      enqueueSnackbar(
        `Order ${result.data && result.data.orderId} successfully created`,
        { variant: "success" }
      );
    } catch (err) {
      let data = err.response && err.response.data;
      if (data && data.reasons) {
        if (data.reasons) {
          data.reasons.forEach((r) =>
            enqueueSnackbar(r.message, { variant: "error" })
          );
          return;
        }
        if (data.message) {
          enqueueSnackbar(data.message, { variant: "error" });
        }
      }
      enqueueSnackbar("Failed to post order to server", { variant: "error" });
    }
  };

  const [values, setValues] = useState({
    openDate: currentDate(),
    items: [],
  });
  const [newItemValues, setNewItemValues] = useState({});
  const [defaultNewItemValues, setDefaultNewItemValues] = useState({});
  const [editItemIndex, setItemEditIndex] = useState(null);

  console.log("values: ", values);

  // fetch one time data from the server
  useEffect(() => {
    const fetchResourceTypes = async () => {
      const result = await axios("http://localhost:5000/resource-types");
      if (result && result.data) {
        setResourceTypes(result.data);
        // add a default type to the new item options
        if (result.data[1]) {
          setDefaultNewItemValues((defaultNewItemValues) => ({
            ...defaultNewItemValues,
            type: result.data[1].slug,
          }));
        }
      }
    };
    const fetchFragranceOilCategories = async () => {
      const result = await axios(
        "http://localhost:5000/fragrance-oil-categories"
      );
      if (result && result.data) {
        setFragranceOilCategories(result.data);

        // add a default categoryId to the new item options
        if (result.data[0]) {
          setDefaultNewItemValues((defaultNewItemValues) => ({
            ...defaultNewItemValues,
            categoryId: result.data[0].id,
          }));
        }
      }
    };
    const fetchSuppliers = async () => {
      const result = await axios("http://localhost:5000/suppliers");
      if (result && result.data) {
        setSuppliers(result.data);
      }
    };
    fetchResourceTypes();
    fetchFragranceOilCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (!values.supplierId) {
      // if supplierId is falsy, don't do anything
      return;
    }

    const fetchFragrancesForSupplier = async () => {
      const result = await axios(
        `http://localhost:5000/fragrance-reference?supplierId=${values.supplierId}`
      );
      if (result && result.data) {
        setFragranceOptions(result.data);
      }
    };

    fetchFragrancesForSupplier();
  }, [values.supplierId]);

  useEffect(() => {
    // update the new item form with the defaults fetched from the server
    setNewItemValues(defaultNewItemValues);
  }, [defaultNewItemValues]);

  const handleFormValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSupplierNameChange = (e, value, reason, more) => {
    if (reason === "clear") {
      setValues((values) => ({
        ...values,
        supplierName: "",
        supplierId: null,
      }));
      return;
    }

    setValues((values) => {
      const updatedValues = {
        ...values,
        supplierName: value.name !== undefined ? value.name : value,
      };
      if (value.id) {
        updatedValues.supplierId = value.id;
      }
      return updatedValues;
    });

    setNewItemValues((values) => {
      return {
        ...values,
        name: value,
      };
    });
  };

  const handleFragranceNameChange = (e, value, reason) => {
    setNewItemValues((values) => {
      return {
        ...values,
        name: value,
      };
    });
  };

  const handleNewItemFormValueChange = (e, more, moremore) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewItemValues((values) => {
      // remove the default 'categoryId' field if we're NOT adding a new fragrance oil
      const { categoryId, ...rest } = values;
      if (editItemIndex === null && name === "type") {
        if (value !== "fragrance-oil") {
          return {
            ...rest,
            [name]: value,
          };
        }
        // add the default categoryId back if we ARE adding a fragrance oil
        else {
          return {
            ...values,
            categoryId: defaultNewItemValues.categoryId,
            [name]: value,
          };
        }
      }
      // return all the values INCLUDING the categoryId field plus the newly changed field
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const calculateSubtotal = () => {
    const subtotal = values.items
      .reduce((sum, item) => (sum += parseFloat(item.price)), 0)
      .toFixed(2);
    console.log("CALC SUB: ", subtotal);

    return subtotal;
  };

  const calculateTotalCost = () => {
    const subtotalCost = parseFloat(values.subtotalCost) || 0;
    const shippingCost = parseFloat(values.shippingCost) || 0;
    const taxesAndFees = parseFloat(values.taxesAndFees) || 0;
    return (subtotalCost + shippingCost + taxesAndFees).toFixed(2);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={itemDialogOpen}
        onClose={() => {
          setItemDialogOpen(false);
          setItemEditIndex(null);
          setNewItemValues(defaultNewItemValues);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Item</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // if we're editing an exisiting item update array with this item
            if (editItemIndex !== null) {
              setValues((values) => ({
                ...values,
                items: [
                  ...values.items.slice(0, editItemIndex),
                  { ...newItemValues },
                  ...values.items.slice(editItemIndex + 1),
                ],
              }));
              // otherwise this is a new item so we can push to the end of the item array
            } else {
              setValues((values) => ({
                ...values,
                items: [...values.items, newItemValues],
              }));
            }

            // reset the item edit status
            setItemEditIndex(null);
            setItemDialogOpen(false);
            setNewItemValues(defaultNewItemValues);
          }}
        >
          <DialogContent className={classes.dialogContent}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="item-type-selector">Item Type</InputLabel>
              <Select
                value={newItemValues.type}
                onChange={handleNewItemFormValueChange}
                inputProps={{
                  name: "type",
                  id: "item-type-selector",
                }}
              >
                {resourceTypes.map((r) => (
                  <MenuItem key={r.slug} value={r.slug}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {newItemValues.type === "fragrance-oil" && (
              <FragranceOilForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
                onComboboxChange={handleFragranceNameChange}
                categories={fragranceOilCategories}
              />
            )}
            {newItemValues.type === "wax" && (
              <WaxForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "additives" && (
              <AdditiveForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "jars" && (
              <JarForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "lids" && (
              <LidForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "boxes" && (
              <BoxForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "dye" && (
              <DyeForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "wicks" && (
              <WickForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "wick-stickers" && (
              <WickStickerForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "warning-labels" && (
              <WarningLabelForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
            {newItemValues.type === "misc-equipment" && (
              <MiscEquipmentForm
                newItemValues={newItemValues}
                onChange={handleNewItemFormValueChange}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {editItemIndex !== null ? "Edit Item" : "Add Item"}
            </Button>
            <Button
              onClick={() => {
                setItemDialogOpen(false);
                setItemEditIndex(null);
                setNewItemValues(defaultNewItemValues);
              }}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Typography className={classes.heading} variant="h4">
        Add New Order
      </Typography>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={submitOrder}>
          <div className={classes.orderInfoSection}>
            <TextField
              label="Date"
              type="date"
              value={values.openDate}
              className={classes.textField}
              onChange={handleFormValueChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                name: "openDate",
              }}
            />
            <Autocomplete
              autoHighlight
              autoSelect
              freeSolo
              options={suppliers}
              getOptionLabel={(supplier) => {
                if (supplier.name) {
                  return supplier.name;
                }
                return supplier;
              }}
              value={values.supplierName || ""}
              style={{ width: 300 }}
              onChange={handleSupplierNameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps, name: "supplier" }}
                  label="Supplier"
                />
              )}
            />
            {/* <TextField
              className={classes.textField}
              label="Source"
              autoFocus
              value={values.source || ""}
              type="text"
              inputProps={{
                name: "source",
              }}
              onChange={handleFormValueChange}
            /> */}
          </div>
          <IconButton
            className={classes.iconButton}
            onClick={() => setItemDialogOpen(true)}
          >
            <Add />
            New Item
          </IconButton>
          <ItemTable
            itemData={values.items}
            onDeleteItem={removeItem}
            onEditItem={editItem}
          />
          <TextField
            label="Notes"
            multiline
            value={values.notes || ""}
            className={classes.textField}
            margin="normal"
            inputProps={{
              name: "notes",
            }}
            onChange={handleFormValueChange}
          />
          <div className={classes.costSection}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Subtotal Cost"
              value={values.subtotalCost || ""}
              type="number"
              placeholder={calculateSubtotal()}
              onChange={handleFormValueChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  name: "subtotalCost",
                  step: "0.01",
                },
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Shipping Cost"
              value={values.shippingCost || ""}
              type="number"
              onChange={handleFormValueChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  name: "shippingCost",
                  step: "0.01",
                },
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Taxes And Fees"
              value={values.taxesAndFees || ""}
              type="number"
              onChange={handleFormValueChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  name: "taxesAndFees",
                  step: "0.01",
                },
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Total Cost"
              value={values.totalCost || ""}
              type="number"
              onChange={handleFormValueChange}
              placeholder={calculateTotalCost()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  name: "totalCost",
                  step: "0.01",
                },
              }}
            />
          </div>
          <div className={classes.formActions}>
            <Button
              className={classes.submitButton}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(withSnackbar(NewOrder));
