$(function () {
  init();
});

function init() {
  let usarioAtual = undefined;
  const lookupUsuarios = new DevExpress.ui.dxLookup("#lookup_usuario", {
    dataSource: new DevExpress.data.DataSource({
      key: "id",
      paginate: false,
      async load() {
        const req = await axios.get("/usuarios");
        return req.data;
      },
    }),
    displayExpr: "nome",
    label: "Usuário",
    width: 300,
    align: "center",
    onValueChanged({ value }) {
      usarioAtual = value.id;
      gridLinks.getDataSource().reload();
    },
  });
  const gridLinks = new DevExpress.ui.dxDataGrid("#grid_usuario", {
    dataSource: new DevExpress.data.DataSource({
      key: "id",
      paginate: false,
      async load() {
        if (!usarioAtual) return [];
        const req = await axios.get("/linksByUser/" + usarioAtual);
        console.log(req);
        return req.data;
      },
      remove: (key) => axios.delete("/link/" + key),
      update: (key, values) => axios.patch("/link/" + key, values),
      insert: ({url, url_encurtada}) => {
        if(!url) return new Error("O ")
      },
    }),
    width: "80%",
    editing: {
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
    },
    columns: [
      {
        dataField: "url",
        caption: "URL Original",
      },
      {
        dataField: "url_encurtada",
        caption: "URL Encourtada",
      },
      {
        dataField: "createdAt",
        caption: "Data Criação",
        dataType: "datetime",
        format: "dd/MM/yyyy HH:mm",
        width: 150,
        allowEditing: false,
      },
      {
        dataField: "updatedAt",
        caption: "Data Atualização",
        dataType: "datetime",
        format: "dd/MM/yyyy HH:mm",
        width: 150,
        allowEditing: false,
      },
    ],
  });
}
