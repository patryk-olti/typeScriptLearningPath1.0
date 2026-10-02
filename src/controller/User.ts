import pool from '../../db.js';
import type { User } from '../types/User.js';

export async function getUsers(): Promise<User[]> {
  const result = await pool.query<User>('SELECT id, name, email, age FROM users');
  return result.rows;
}

export async function getUserByEMail(email: string): Promise<User | undefined>{

  const result = await pool.query<User>(
    `SELECT id, name, email, age FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}


/*
Result z postgre:

Result {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [
    {
      id: 1,
      name: 'Jan Kowalski',
      email: 'jan.kowalski@example.com',
      age: 25
    }
  ],
  fields: [
    Field {
      name: 'id',
      tableID: 16389,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    },
    Field {
      name: 'name',
      tableID: 16389,
      columnID: 2,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 104,
      format: 'text'
    },
    Field {
      name: 'email',
      tableID: 16389,
      columnID: 3,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 154,
      format: 'text'
    },
    Field {
      name: 'age',
      tableID: 16389,
      columnID: 4,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [
    [Function: parseInteger],
    [Function: noParse],
    [Function: noParse],
    [Function: parseInteger]
  ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: { id: null, name: null, email: null, age: null }
}

*/