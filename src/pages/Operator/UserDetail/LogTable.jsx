import React from 'react';
import { Table, Search, TableProvider } from 'table-render';

import userManagerApi from '../../../api/operator/user-manager';

const LogTable = ({
  columns,
  rowKey,
  userId,
  method,
}) => {
  const searchApi = async (params = {}) => {
    const [, res] = await userManagerApi[method]({
      ...params,
      user_id: userId,
    });
    if (res && res.result) {
      return {
        rows: res.result.list,
        total: res.result.total,
      };
    }
    return null;
  };

  return (
    <div>
      <TableProvider>
        <Search className="hide" api={searchApi} />
        <Table
          columns={columns}
          rowKey={rowKey}
        />
      </TableProvider>
    </div>
  );
};

export default LogTable;
