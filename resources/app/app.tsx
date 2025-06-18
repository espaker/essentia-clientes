import React, { useCallback, useState } from 'react';
import ClientsList from './components/clientslist';
import { Button, Card, Flex, Image, Layout } from 'antd';
import { ContactsOutlined, PlusOutlined } from '@ant-design/icons';
import AddClientModal from './components/addclientmodal';
import EditClientModal from './components/editclientmodal';

export default function App() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [reload, setReload] = useState(false);

    const showModal = useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleModalEdit = useCallback((id: number) => {
        setSelectedClientId(id);
        setIsEditModalOpen(true);
    }, []);

    return (
        <Flex gap={`middle`} wrap>
            <AddClientModal
                open={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setReload(!reload);
                }}
            />
            <EditClientModal
                open={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setReload(!reload);
                }}
                clientId={selectedClientId}
            />

            <Layout>
                <Layout.Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
                    <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                        <Image src="https://essentia.com.br/wp-content/uploads/2019/07/ho_logo_essential_nutrition.png" alt="Logo" style={{ height: 40 }} />
                        <h1 style={{ color: 'white', margin: 0 }}>Gerenciamento de Clientes</h1>
                    </Flex>
                </Layout.Header>
                <Layout.Content>
                    <Card title={<span><ContactsOutlined /> Clientes</span>} style={{ margin: '24px' }} extra={<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Adicionar Cliente</Button>}>
                        <ClientsList reload={reload} setReload={setReload} openEditModal={handleModalEdit} />

                    </Card>
                </Layout.Content>
            </Layout>
        </Flex>
    );
}
