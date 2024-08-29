const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String
});

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

async function createData() {
  const user = new User({ name: 'John Doe', email: 'john.doe@example.com' });
  await user.save();

  const post = new Post({ title: 'My First Post', content: 'This is the content of the post', author: user._id });
  await post.save();
}

async function getPostWithAuthor() {
  const post = await Post.findOne({ title: 'My First Post' }).populate('author');
  console.log(post);
}

mongoose.connection.once('open', async () => {
  await createData();
  await getPostWithAuthor();
  mongoose.connection.close();
});
