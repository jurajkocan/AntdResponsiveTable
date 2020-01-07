# AntdResponsiveTable

this project is in "Beta" version... but at least will create somehow more responsive table.

Responsive antd table.
this component will render classic antd table with full support of anything antd table can do.

On mobileBreakPoint will render custom html for better responsive design. currently limited only for some props.

## install

```
npm i ant-responsive-table
```

## usage

```typescript
import Table from "ant-responsive-table";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const App: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street"
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street"
    }
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      showOnResponse: true,
      showOnDesktop: true
    }
  ];
  return (
    <div>
      <Table
        antTableProps={{
          showHeader: true,
          columns,
          dataSource,
          pagination: false
        }}
        mobileBreakPoint={768}
      />
    </div>
  );
};
```

Props:

```
mobileBreakPoint
```

- breakpoint in px when should table render with "custom design"

```
antTableProps
```

- all props from antd table with 2 additional required pops in columns:

```
showOnResponse: boolean
showOnDesktop: boolean
```

- determine if column is rendered on desktop and response

currently supported props from ant table on responsive design:

- pagination
- onRow
- columns.render
- columns.title

[read more about antd table here](https://ant.design/components/table/)

this readme sucks. feel free to contribute on github.
