const EquipmentStatusPage = async (props:  {params: Promise<{ id: string }>}) => {
  const params = await props.params;
  return <div>EquipmentStatusPage ID = {params.id}</div>;
};

export default EquipmentStatusPage;
