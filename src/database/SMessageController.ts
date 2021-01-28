import pool from './dbconnector';

export interface ISmessage {
    [id: number] : string;
    [message_id: string] : string;
}

export class SMessageController {

    public async get(id?: number): Promise< ISmessage[] | undefined > {
        try{
            const client = await pool.connect();
            let sMessages: ISmessage[];
            
            if (id) {
                const sql = "SELECT * FROM smessages WHERE id = $1";
                const { rows } = await client.query(sql, [id]);
                sMessages = rows;
                
            } else {
                const sql = "SELECT * FROM smessages";
                const { rows } = await client.query(sql);

                sMessages = rows;
            }


            client.release();
            return sMessages;

        } catch (error) {
            console.log(error);
        }
    }

    /**
        Updates the message_id an SMessage is binded to.
      */
    public async update(id: number, message_id: string){
        try {
            const client = await pool.connect();
            const sql: string = "UPDATE smessages SET message_id = $1 WHERE id=$2 RETURNING *";

            const { rows } = await client.query(sql, [message_id, id]);            

            client.release();
            return rows[0];

        } catch (error) {
            console.log(error);
        }
    }
}

