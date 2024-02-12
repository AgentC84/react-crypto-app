import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CryptoInfoModal from '../CryptoInfoModal'
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (中国)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA (美国)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan (日本)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (韩国)',
    },
  ];

export default function AppHeader() {
  const [select, setSelet] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();
  
  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  useEffect(() => {
    const keypress = event => {
      if(event.key === '/') {
        setSelet((prev)=> !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => removeEventListener('keypress', keypress)
  }, [])

  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (<Layout.Header style={headerStyle}>
    <Select
      style={{
        width: 250,
      }}
      open ={select}
      onSelect={handleSelect}
      onClick={() => setSelet((prev)=> !prev)}
      placeholder="press/ to open"
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon
      }))}
      optionRender={(option) => (
        <Space>
          <img 
            style={{width: 20}} 
            src={option.data.icon} 
            alt ={option.data.label}/> 
            {option.data.label}
        </Space>
      )}
    />
    <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

    <Modal  open={modal} onCancel={() => setModal(false)} footer={null}>
        <CryptoInfoModal coin={coin}></CryptoInfoModal>
    </Modal>

    <Drawer  
      width={600} 
      title = 'Add Asset' 
      onClose={() => setDrawer(false)} 
      open={drawer} 
      destroyOnClose
    >
      <AddAssetForm onClose={() => setDrawer(false)}/>
    </Drawer>
  </Layout.Header>)
} 