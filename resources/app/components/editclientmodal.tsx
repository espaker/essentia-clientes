import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import PhoneInput from "antd-phone-input";
import { UploadOutlined } from "@ant-design/icons";
import api from "../services/api";

const EditClientModal: React.FC<{ open: boolean; onClose: () => void, clientId: number | null }> = ({ open, onClose, clientId }) => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const handleFinish = useCallback(() => {
        form.resetFields();
        onClose();
    }, [form, onClose]);

    const handleSave = useCallback(() => {
        form.validateFields().then(values => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phone", `${values.phone.countryCode}${values.phone.areaCode}${values.phone.phoneNumber}`);

            if (avatar.length > 0) {
                formData.append("avatar", avatar[0].originFileObj);
            }

            formData.append('_method', 'PUT'); // Para garantir que o método PUT seja usado por limitacao do PHP

            console.log("Enviando dados do cliente:", formData);

            api.post(`/clients/${clientId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
                transformRequest: [(data, headers) => {
                    delete headers['Content-Type'];
                    return data;
                }]
            })
            .then(() => {
                form.resetFields();
                setAvatar([]);
                onClose();
                message.success("Cliente editado com sucesso!");
            })
            .catch(err => {
                message.error(`Erro ao salvar cliente: ${err.response?.data?.message || "Erro desconhecido"}`);
                console.error("Erro ao salvar cliente:", err);
            });
        });
    }, [form, avatar, onClose]);

    useEffect(() => {
        if (clientId) {
            setLoading(true);
            api.get(`/clients/${clientId}`)
                .then(response => {
                    const client = response.data;
                    form.setFieldsValue({
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                    });
                })
                .catch(err => {
                    message.error(`Erro ao carregar cliente: ${err.response?.data?.message || "Erro desconhecido"}`);
                    console.error("Erro ao carregar cliente:", err);
                })
                .finally(() => {
                    setLoading(false); 
                });
        }
    }, [clientId, form]);


    return (
        <Modal title="Editar Cliente" open={open} onCancel={onClose} onOk={handleSave} loading={loading} okText="Salvar" cancelText="Cancelar">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Por favor, insira seu nome!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Por favor, insira seu email!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Telefone" rules={[{ required: true, message: "Por favor, insira seu telefone!" }]}>
                    <PhoneInput country="br" />
                </Form.Item>
                <Form.Item name="avatar" label="Avatar">
                    <Upload
                        accept="image/*"
                        listType="picture"
                        multiple={false}
                        onChange={(info) => {
                            setAvatar(info.fileList);
                        }}
                        maxCount={1}
                        fileList={avatar}
                        beforeUpload={() => false}
                        showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                    >
                        {(!avatar.length) && <Button icon={<UploadOutlined />}>Clique para escolher...</Button>}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditClientModal;
