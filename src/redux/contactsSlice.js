import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

export const initialContact = {
    contacts: {
        items: [],
        loading: false,
        error: null
    },
    filters: {
        name: ""
    }
};

const handlePending = (state) => {
    state.contacts.loading = true;
};

const handleFetchFulfilled = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = null;
    state.contacts.items = action.payload;
};

const handleAddFulfilled = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = null;
    state.contacts.items.push(action.payload);
};

const handleDeleteFulfilled = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = null;
    state.contacts.items = state.contacts.items.filter(
        (contact) => contact.id !== action.payload
    );
};

const handleRejected = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = action.payload;
};

const contactSlice = createSlice({
    name: "contacts",
    initialState: initialContact,
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, handleFetchFulfilled)
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, handleAddFulfilled)
        .addCase(addContact.rejected, handleRejected)
        .addCase(deleteContact.pending, handlePending)
        .addCase(deleteContact.fulfilled, handleDeleteFulfilled)
        .addCase(deleteContact.rejected, handleRejected)
    },
});

const selectContactsState = (state) => state.contact;
const selectFiltersState = (state) => state.filters;

export const selectFilteredContacts = createSelector(
    [selectContactsState, selectFiltersState],
    (contactsState, filtersState) => {
        const {items} = contactsState.contacts;
        const {name} = filtersState;
        if (items.length > 0 && name.trim() !== "") {
            return items.filter((contact) => 
        contact.name.toLowerCase().includes(name.trim().toLowerCase())
        );
        }
        return items;
    }
);

export const selectContacts = (state) => state.contacts.contacts.items;
export const contactsReducer = contactSlice.reducer;    