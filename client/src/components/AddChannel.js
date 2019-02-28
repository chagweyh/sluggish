import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Input, Form, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import { getCurrentUser, getJwt } from '../utils/auth';

function AddChannel({ users, handleAddChannel }) {
  const [open, setOpen] = useState(false);
  const formInitialState = {
    private: false,
    name: '',
    purpose: '',
    members: [],
  };
  const [form, setForm] = useState(formInitialState);

  const usersList = users.map((user) => ({
    key: user.id,
    value: user.id,
    text: user.username,
    image: { avatar: true, src: user.gravatar },
  }));

  const handleChange = (e, data) => {
    setForm({
      ...form,
      [data.name]: data.value || data.checked,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/channels',
        { ...form, owner: getCurrentUser().data._id },
        {
          headers: {
            'x-auth-token': getJwt(),
          },
        },
      );
      const channel = response.data;
      setForm(formInitialState);
      setOpen(false);
      handleAddChannel(channel);
      console.log(channel);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      trigger={
        <span style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <Icon link name="add" />
          Add a channel
        </span>
      }
      closeIcon
      open={open}
      // closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
    >
      <Header content={form.private ? 'Create a private channel' : 'Create a channel'} />
      <Modal.Content>
        <Form size="large" method="post" id="addChannel" onSubmit={handleSubmit}>
          <Form.Field>
            <Checkbox
              label={
                form.private
                  ? 'This channel can only be joined or viewed by invite.'
                  : 'Anyone can view and join this channel.'
              }
              toggle
              name="private"
              checked={form.private}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              value={form.name}
              icon={form.private ? 'lock' : 'hashtag'}
              iconPosition="left"
              placeholder="e.g. react"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="purpose">Purpose</label>
            <Input id="purpose" name="purpose" value={form.purpose} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="invite_members">Send invites to</label>
            <Form.Dropdown
              id="members"
              name="members"
              clearable
              fluid
              multiple
              search
              selection
              options={usersList}
              placeholder="Search by name"
              value={form.members}
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" form="addChannel">
          Create Channel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddChannel;
