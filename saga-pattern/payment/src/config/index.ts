export default () => ({
  broker: process.env.BROCKER ?? 'broker:9092',
  services: {
    payment: {
      clientId: 'payment',
      groupId: 'payment',
      name: 'payment-kafka-client',
    },
  },
});
