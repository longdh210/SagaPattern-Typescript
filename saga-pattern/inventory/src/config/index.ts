export default () => ({
  broker: process.env.BROCKER ?? 'broker:9092',
  services: {
    inventory: {
      clientId: 'inventory',
      groupId: 'inventory',
      name: 'inventory-kafka-client',
    },
  },
});
