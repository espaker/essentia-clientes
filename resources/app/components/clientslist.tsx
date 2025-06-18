import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, message, Popconfirm, Table } from "antd";
import api from "../services/api";
import { UserOutlined } from "@ant-design/icons";
import PhoneInput from "antd-phone-input";

const Clients: React.FC<{reload: boolean, setReload: (value: boolean) => void, openEditModal: (id: number) => void}> = ({reload, setReload, openEditModal}) => {
  const columns = useMemo(() => [
    { title: 'Avatar', 
      dataIndex: 'avatar', 
      key: 'avatar', 
      render: (text: string) =>  <Avatar src={text} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} icon={!text && <UserOutlined />} />
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => <PhoneInput
        value={text}
        readOnly
        style={{
          border: 'none',
          background: 'transparent',
          boxShadow: 'none',
          pointerEvents: 'none',
        }}
      />
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <span>
          <a onClick={() => openEditModal(record.id)}>Editar</a>
          <Popconfirm
            title="Excluir Cliente"
            description="Tem certeza de que deseja excluir este cliente?"
            onConfirm={() => {
              api.delete(`/clients/${record.id}`)
                .then(() => {
                  setReload(true);
                  message.success('Cliente excluído com sucesso!');
                })
                .catch((error) => {
                  message.error(`Erro ao excluir cliente: ${error.response?.data?.message || "Erro desconhecido"}`);
                });
            }}
            okText="Sim"
            cancelText="Não"
          >
            <a style={{ marginLeft: 8, color: 'red' }} >Excluir</a>
          </Popconfirm>
          
        </span>
      ),
    }
  ], []);

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setReload(true);
    api.get('/clients')
      .then(response => {
        setDataSource(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      })
      .finally(() => {
        setLoading(false);
        setReload(false);
      });
  }, []);
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [reload, fetchData]);

  return (
    <Table columns={columns} dataSource={dataSource} rowKey='id' loading={loading} />
  );
}

export default Clients;