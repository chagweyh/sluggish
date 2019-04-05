import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Input, Form, Checkbox } from 'semantic-ui-react';
import API from '../utils/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/channels', form);
      const channel = response.data;
      setForm(formInitialState);
      setOpen(false);
      handleAddChannel(channel);
    } catch (error) {
      console.error(error);
    }
  };

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
              disabled={!form.private}
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
