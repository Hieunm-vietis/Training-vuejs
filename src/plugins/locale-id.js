const messages = {
    email: (field) => `${field} Đây méo phải email`,
    min: (field, [length]) => `${field} Nhập chưa được ${length} `,
    required: (field) => `${field} Nhập thiếu kìa`,
};
  
const locale = {
    name: 'id',
    messages,
    attributes: {}
};
  
export default locale;