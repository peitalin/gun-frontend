import fetch from 'isomorphic-unfetch'
import { Order, ID } from "typings/gqlTypes";
import { v4 as uuidv4 } from "uuid";



export type OrderEmail = {
  id: string,
  items: Array<OrderItemEmail>,
  total: number,
};

export type OrderItemEmail = {
  id?: string;
  name: string;
  price: number;
  license: string;
  quantity: number;
};

export type UserPublic = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  store_id: string;
  payout_method_id: string;
}




export const sendTicket = ({
  ticketId,
  subject,
  body,
  email,
  name,
}: {
  ticketId: string,
  subject: string,
  body: string,
  email: string,
  name: string,
}) => {

  console.log('creating a support ticket...')

  let ticket = {
   request: {
      requester: {
        "name": name,
        "email": email,
      },
      subject: `${subject} - ticketID: ${ticketId}`,
      comment: {
        body: body
      }
    }
  };

  // let access_token = btoa(`s4143868@gmail.com:${ZENDESK_PASSWORD}`)
  // let access_token = btoa(`support@relaydownloads.com:${ZENDESK_PASSWORD}`)
  // let access_token = btoa(`s4143868@gmail.com%2Ftoken:${ZENDESK_ACCESS_TOKEN}`)
  // let access_token = btoa(`support@relaydownloads.com%2Ftoken:${ZENDESK_ACCESS_TOKEN}`)

  return fetch(
    `https://efc.zendesk.com/api/v2/requests.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Basic ${access_token}`,
      },
      body: JSON.stringify(ticket)
    }
  ).then(res => res.json())
}
