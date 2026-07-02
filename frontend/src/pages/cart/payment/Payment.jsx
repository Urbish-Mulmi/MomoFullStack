import React from 'react'
import CryptoJS from "crypto-js";
import { useLocation } from 'react-router';

const Payment = () => {
  const location = useLocation();
  console.log("location.state:", location?.state);
  
  const total_amount = location?.state?.totalAmount;
const transaction_uuid = location?.state?.orderID;
  const hash  = CryptoJS.HmacSHA256(
    `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`, import.meta.env.VITE_ESEWA_SECRET_KEY,

  ); 
 const signature = CryptoJS.enc.Base64.stringify(hash);
  return (
   <div>
  <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
    <input type="text" id="amount" name="amount" defaultValue={total_amount} required />
    <input type="text" id="tax_amount" name="tax_amount" defaultValue={0} required />
    <input type="text" id="total_amount" name="total_amount" defaultValue={total_amount} required />
    <input type="text" id="transaction_uuid" name="transaction_uuid" defaultValue={transaction_uuid} required />
    <input type="text" id="product_code" name="product_code" defaultValue="EPAYTEST" required />
    <input type="text" id="product_service_charge" name="product_service_charge" defaultValue={0} required />
    <input type="text" id="product_delivery_charge" name="product_delivery_charge" defaultValue={0} required />
    <input type="text" id="success_url" name="success_url" defaultValue="http://localhost:9000/api/orders/success" required />
    <input type="text" id="failure_url" name="failure_url" defaultValue="https://developer.esewa.com.np/failure" required />
    <input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required />
    <input type="text" id="signature" name="signature" defaultValue={signature} required />
    <input defaultValue="Submit" type="submit" />
  </form>
</div>

  )}


export default Payment
