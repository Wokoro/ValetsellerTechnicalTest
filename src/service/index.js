
/**
 * @author - wokorosamuel@yahoo.com
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.ECOMDASH_BASE_URL;
const OCP_SUB_KEY = process.env.OCP_SUBSCRIPTION_KEY
const ECD_SUB_KEY = process.env.ECD_SUBSCRIPTION_KEY

const HEADERS = {
  'ecd-subscription-key': ECD_SUB_KEY,
  'Ocp-Apim-Subscription-Key': OCP_SUB_KEY,
  'Content-Type': 'application/json'
}

/**
 * @description - Function to retrieve product(s) information
 *
 * @param {string[]} SKUs - SKUs values for products to retrieve
 *
 * @returns {object} - Returns product(s) found and status of request
 */
export async function getProducts(SKUs = []) {
  const payload = { idType: 'sku', idList: [...SKUs] }
  const url = BASE_URL + '/inventory/getProducts'

  const response = await axios.post(
    url,
    payload,
    { headers: { ...HEADERS } }
  );

  return response.data;
}
