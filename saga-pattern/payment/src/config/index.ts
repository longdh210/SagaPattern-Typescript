export default () => ({
  broker: 'broker:9092',
  services: {
    payment: {
      clientId: 'payment',
      groupId: 'payment',
      name: 'payment-kafka-client',
    },
  },
});
