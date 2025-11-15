import { useState } from 'react';
import { ArrowLeft, UserPlus, Trash2, Phone, Mail, User as UserIcon } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Mom',
      phone: '+27 82 123 4567',
      relationship: 'Mother'
    },
    {
      id: '2',
      name: 'Sister Sarah',
      phone: '+27 81 234 5678',
      relationship: 'Sister'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && contacts.length < 5) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', relationship: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 flex items-center gap-4 shadow-lg">
        <button onClick={onBack} className="text-white hover:text-purple-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-xl">Settings</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Profile</h2>
          <div className="bg-white border border-purple-100 rounded-3xl p-5 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200">
                <UserIcon size={36} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-gray-900 text-lg">Vuyiswa</p>
                <p className="text-gray-500 text-sm mt-1">Member since 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-800">Emergency Contacts</h2>
              <p className="text-gray-500 text-sm">
                {contacts.length}/5 contacts • Will receive SMS when activated
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5 mb-4 shadow-sm">
            <p className="text-amber-900 text-sm">
              When you activate the alert, all contacts will receive an SMS with your location and emergency message.
            </p>
          </div>

          {/* Contacts List */}
          <div className="space-y-3 mb-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white border border-purple-100 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone size={16} className="text-gray-400" />
                      <p className="text-gray-800">{contact.name}</p>
                    </div>
                    <p className="text-gray-600 text-sm ml-6">{contact.phone}</p>
                    <p className="text-gray-400 text-xs ml-6 mt-1">{contact.relationship}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Contact Form */}
          {showAddForm ? (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4">
              <h3 className="text-gray-800 mb-3">Add Emergency Contact</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <input
                  type="text"
                  placeholder="Relationship (e.g., Friend, Sister)"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddContact}
                    className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Save Contact
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewContact({ name: '', phone: '', relationship: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={contacts.length >= 5}
              className={`w-full border-2 border-dashed rounded-2xl p-4 flex items-center justify-center gap-2 transition-colors ${
                contacts.length >= 5
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-purple-300 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <UserPlus size={20} />
              <span className="text-sm">
                {contacts.length >= 5 ? 'Maximum contacts reached' : 'Add Emergency Contact'}
              </span>
            </button>
          )}
        </div>

        {/* App Settings */}
        <div className="mt-8">
          <h2 className="text-gray-900 mb-4">App Settings</h2>
          <div className="space-y-3">
            <div className="bg-white border border-purple-100 rounded-3xl p-5 flex items-center justify-between shadow-md">
              <div>
                <p className="text-gray-800 text-sm">Notifications</p>
                <p className="text-gray-500 text-xs">Get alerts and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="bg-white border border-purple-100 rounded-3xl p-5 flex items-center justify-between shadow-md">
              <div>
                <p className="text-gray-800 text-sm">Location Services</p>
                <p className="text-gray-500 text-xs">Share location in emergencies</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
