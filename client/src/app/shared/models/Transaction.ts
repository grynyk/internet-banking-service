export class Transaction {
    id?:string;
    description:string;
    amount: any;
    created_date?:Date;
    sender_uuid?:string;
    receiver_uuid?:string;
    status?:boolean;
    sender_account_type?:string;
    receiver_account_type?:string;
    type?:string;
    receiver_name?:string;
    sender_name?:string;
    sender_account_number?: string;
    receiver_account_number?:string;
  }