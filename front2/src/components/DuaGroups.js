import React, { useState } from 'react';
import './DuaGroups.css';
import Rewards from './Rewards';
import Leaderboard from './LeaderBoard';
import Notifications from './Notifications';
import Comments from './Comments';
import HatimPaylas from './HatimPaylas';

const initialDuaGroups = [
  {
    groupName: 'Sabah Duaları',
    duas: ['Allahumme bismike emutu ve ahya.', 'Subhanellezi yahye...'],
    hatimRequests: [
      {
        text: 'Hatim paylaşımı: 1. cüz okunacak.',
        participants: [],
        comments: [],
        confirmed: []
      }
    ]
  },
  {
    groupName: 'Akşam Duaları',
    duas: ['Allahumme inni es’eluke afiyeh.', 'Hasbiyallahu la ilaha...'],
    hatimRequests: []
  },
  // Daha fazla dua grubu ekleyebilirsiniz
];

const initialUsers = [
  { name: 'User1', points: 10, badges: ['Rozet1', 'Rozet2'] },
  { name: 'User2', points: 20, badges: ['Rozet1'] },
  // Daha fazla kullanıcı ekleyebilirsiniz
];

const initialNotifications = ['Dua zamanı geldi!', 'Yeni bir hatim paylaşımı var.'];

const DuaGroups = () => {
  const [duaGroups, setDuaGroups] = useState(initialDuaGroups);
  const [newGroupName, setNewGroupName] = useState('');
  const [newDua, setNewDua] = useState('');
  const [newHatim, setNewHatim] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState(initialNotifications);

  const currentUser = users.find(user => user.name === 'User1'); // Mevcut kullanıcıyı belirleyin

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      setDuaGroups([...duaGroups, { groupName: newGroupName, duas: [], hatimRequests: [] }]);
      setNewGroupName('');
    }
  };

  const handleAddDua = (groupIndex) => {
    if (newDua.trim()) {
      const updatedDuaGroups = [...duaGroups];
      updatedDuaGroups[groupIndex].duas.push(newDua);
      setDuaGroups(updatedDuaGroups);
      setNewDua('');
    }
  };

  const handleAddHatim = (groupIndex) => {
    if (newHatim.trim()) {
      const updatedDuaGroups = [...duaGroups];
      updatedDuaGroups[groupIndex].hatimRequests.push({ text: newHatim, participants: [], comments: [], confirmed: [] });
      setDuaGroups(updatedDuaGroups);
      setNewHatim('');
    }
  };

  const handleJoinRequest = (groupIndex, requestIndex) => {
    const updatedDuaGroups = [...duaGroups];
    const participants = updatedDuaGroups[groupIndex].hatimRequests[requestIndex].participants;
    if (!participants.includes(currentUser.name)) {  // Mevcut kullanıcı adıyla kontrol edin
      participants.push(currentUser.name);
      // Kullanıcıya puan ekle
      const updatedUsers = users.map(user => {
        if (user.name === currentUser.name) {
          return { ...user, points: user.points + 1 };
        }
        return user;
      });
      setUsers(updatedUsers);
    }
    setDuaGroups(updatedDuaGroups);
  };

  const handleConfirmHatim = (groupIndex, requestIndex) => {
    const updatedDuaGroups = [...duaGroups];
    const confirmed = updatedDuaGroups[groupIndex].hatimRequests[requestIndex].confirmed;
    if (!confirmed.includes(currentUser.name)) {
      confirmed.push(currentUser.name);
      const updatedUsers = users.map(user => {
        if (user.name === currentUser.name) {
          return { ...user, points: user.points + 2 }; // Puanı artırın
        }
        return user;
      });
      setUsers(updatedUsers);
    }
    setDuaGroups(updatedDuaGroups);
  };

  const handleAddComment = (groupIndex, requestIndex, comment) => {
    const updatedDuaGroups = [...duaGroups];
    updatedDuaGroups[groupIndex].hatimRequests[requestIndex].comments.push(comment);
    setDuaGroups(updatedDuaGroups);
  };

  const handleAttendEvent = () => {
    // Etkinlik katılımı için puan ekleyin
    const updatedUsers = users.map(user => {
      if (user.name === currentUser.name) {
        return { ...user, points: user.points + 5 }; // Etkinlik katılımı için puan
      }
      return user;
    });
    setUsers(updatedUsers);
    setNotifications([...notifications, 'Etkinliğe katıldığınız için 5 puan kazandınız!']);
  };

  const handleCompleteDailyTask = () => {
    // Günlük görev tamamlandığında puan ekleyin
    const updatedUsers = users.map(user => {
      if (user.name === currentUser.name) {
        return { ...user, points: user.points + 3 }; // Günlük görev için puan
      }
      return user;
    });
    setUsers(updatedUsers);
    setNotifications([...notifications, 'Günlük görevi tamamladığınız için 3 puan kazandınız!']);
  };

  const handleShareOnSocial = () => {
    // Sosyal medyada paylaşım için puan ekleyin
    const updatedUsers = users.map(user => {
      if (user.name === currentUser.name) {
        return { ...user, points: user.points + 2 }; // Sosyal paylaşım için puan
      }
      return user;
    });
    setUsers(updatedUsers);
    setNotifications([...notifications, 'Dua isteğini paylaştığınız için 2 puan kazandınız!']);
  };

  return (
    <div className="dua-groups-page">
      <h1>Dua Grupları</h1>
      {duaGroups.map((group, index) => (
        <div key={index} className="dua-group">
          <h2>{group.groupName}</h2>
          <ul>
            {group.duas.map((dua, duaIndex) => (
              <li key={duaIndex}>{dua}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newDua}
            onChange={(e) => setNewDua(e.target.value)}
            placeholder="Yeni dua ekle"
          />
          <button onClick={() => handleAddDua(index)}>Ekle</button>
          <h3>Hatim Paylaşımları</h3>
          {group.hatimRequests.map((request, requestIndex) => (
            <div key={requestIndex} className="dua-request">
              <p>{request.text}</p>
              <button onClick={() => handleJoinRequest(index, requestIndex)}>Katıl ({request.participants.length})</button>
              <button onClick={() => handleConfirmHatim(index, requestIndex)}>Tamamlandı ({request.confirmed.length})</button>
              <ul>
                {request.participants.map((participant, participantIndex) => (
                  <li key={participantIndex}>{participant}</li>
                ))}
              </ul>
              <Comments
                comments={request.comments}
                onAddComment={(comment) => handleAddComment(index, requestIndex, comment)}
              />
            </div>
          ))}
          <HatimPaylas onAddHatim={(hatimText) => handleAddHatim(index, hatimText)} />
          <input
            type="text"
            value={newHatim}
            onChange={(e) => setNewHatim(e.target.value)}
            placeholder="Yeni hatim paylaşımı ekle"
          />
          <button onClick={() => handleAddHatim(index)}>Hatim Ekle</button>
        </div>
      ))}
      <div className="new-group">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Yeni grup ismi"
        />
        <button onClick={handleAddGroup}>Yeni Grup Ekle</button>
      </div>
      <div className="extra-features">
        <button onClick={handleAttendEvent}>Etkinliğe Katıl</button>
        <button onClick={handleCompleteDailyTask}>Günlük Görevi Tamamla</button>
        <button onClick={handleShareOnSocial}>Sosyal Medyada Paylaş</button>
      </div>
      <Leaderboard users={users} />
      <Notifications notifications={notifications} />
      <Rewards user={currentUser} /> {/* Mevcut kullanıcıyı prop olarak geçin */}
    </div>
  );
};

export default DuaGroups;
