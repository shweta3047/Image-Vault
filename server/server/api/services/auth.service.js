import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(userDetail) {
    try {
      if (!userDetail.email || !userDetail.password)
        throw { message: "Fill all the fields!" };
      const user = await User.findOne({
        email: userDetail.email,
      });
      if (!user) throw { message: `Incorrect email or password!` };
      const isSame = await bcrypt.compare(userDetail.password, user.password);
      if (!isSame) throw { message: `Incorrect email or password!` };
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      user.password = undefined;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async signup(userDetail) {
    try {
      const { name, email, password, phoneNumber } = userDetail;
      if (!email || !password || !name)
        throw { message: "Fill all the required fields!" };
      const user = await User.findOne({ email });
      if (user) throw { message: `Email already exists!` };

      const hashedPassword = await bcrypt.hash(password, 9);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      newUser.password = undefined;
      return { user: newUser };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
