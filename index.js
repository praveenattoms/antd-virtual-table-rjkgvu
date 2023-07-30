import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import { VList } from 'virtuallist-antd';

const data = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    key: i,
    date: '2018-02-11',
    amount: i,
    type: 'income',
    note: 'transfer',
  });
}

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  console.log(...restProps);

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} style={{ borderRight: '1px solid #eee' }} />
    </Resizable>
  );
};

class Demo extends React.Component {
  state = {
    columns: [
      {
        title: 'Date',
        dataIndex: 'date',
        width: 100,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 100,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 100,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: 100,
      },
    ],
  };

  components = {
    ...VList({
      height: 500,
    }),
    header: {
      cell: ResizableTitle,
    },
  };

  handleResize =
    (index) =>
    (e, { size }) => {
      this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Table
        size="small"
        bordered
        components={this.components}
        pagination={false}
        scroll={{ y: 500 }}
        columns={columns}
        dataSource={data}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('container'));
