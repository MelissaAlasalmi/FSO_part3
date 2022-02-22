import axios from "axios";
const baseUrl = "/api/persons";

export const createContact = contact => {
  const request = axios.post(baseUrl, contact);
  return request.then(response => response.data);
};

export const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

export const updateContact = (id, contact) => {
  const request = axios.put(`${baseUrl}/${id}`, contact);
  return request.then(response => response.data);
};