export default () => ({
  broker: 'broker:9092',
  services: {
    inventory: {
      clientId: 'inventory',
      groupId: 'inventory',
      name: 'inventory-kafka-client',
    },
  },
});
