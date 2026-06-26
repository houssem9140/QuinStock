function sanitizeUser(user) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    imageUrl: user.imageUrl,
    role: user.role,
    companyName: user.companyName,
    taxId: user.taxId,
    address: user.address,
  };
}

module.exports = sanitizeUser;
