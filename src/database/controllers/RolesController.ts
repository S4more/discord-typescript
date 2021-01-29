import pool from "../dbconnector";

export interface RoleRow {
    id: string;
    name: string;
    emoji: string;
}

export class RolesController {
    public async get(id?: string, name?: string, emoji?: string): Promise <RoleRow> {
        if (!id && !name && !emoji) {
            console.log("No id or name or role specified in roles controller");
        }
    
        const client = await pool.connect();
        let sql: string;
        let answer;

        if ( id ) {
            sql = "SELECT * FROM roles WHERE id = $1";
            const { rows }= await client.query(sql, [id]);
            answer = rows;
        } else if (emoji) {
            sql = "SELECT * FROM roles where emoji=$1";
            const { rows }= await client.query(sql, [emoji]);
            answer = rows;
        } else {
            sql = "SELECT * FROM roles WHERE name = $1";
            const { rows }= await client.query(sql, [name]);
            answer = rows;
        }



        client.release();
        return answer[0];
    }

    public async getAll(): Promise<RoleRow[]> {

        const client = await pool.connect();
        let sql: string;
        sql = "SELECT * FROM roles";
        const { rows }= await client.query(sql);

        client.release();
        return rows;
    }


    /**
        Tries to put role into database and if role already exists,
        updates it.
      */
    public async put(id: string, name: string, emoji: string): Promise <RoleRow> {
        const client = await pool.connect();
        let answer;
        let sql = "INSERT INTO roles (id, name, emoji) VALUES ($1, $2, $3) RETURNING *";
        try {
            let { rows } = await client.query(sql, [id, name, emoji]);
            answer = rows;
        } catch (error) {
            console.log(error);
            answer = [await this.update(id, name, emoji)];
        }


        client.release();
        return  answer[0];
    }

    public async update(id: string, name:string, emoji: string): Promise<RoleRow> {
        const client = await pool.connect();
        let sql = "UPDATE roles SET name = $1, emoji=$2 WHERE id = $3 RETURNING *";

        const { rows } = await client.query(sql, [name, emoji, id]);

        console.log("Updating...");

        client.release();
        return rows[0];
    }


}
