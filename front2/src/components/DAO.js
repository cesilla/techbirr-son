import React, { useState } from 'react';
import './DAO.css';
import Comments from './Comments';

const initialProposals = [
  {
    title: 'Yeni Dua Etkinliği Oluşturma',
    description: 'Topluluk için haftalık dua etkinliği düzenleyelim.',
    votes: { yes: 10, no: 2 },
    comments: []
  },
  {
    title: 'Bağış Kampanyası Başlatma',
    description: 'Topluluk için bir bağış kampanyası başlatalım.',
    votes: { yes: 8, no: 1 },
    comments: []
  },
  // Daha fazla öneri ekleyebilirsiniz
];

const initialUsers = [
  { name: 'User1', points: 10, badges: ['Rozet1', 'Rozet2'] },
  { name: 'User2', points: 20, badges: ['Rozet1'] },
  // Daha fazla kullanıcı ekleyebilirsiniz
];

const DAO = () => {
  const [proposals, setProposals] = useState(initialProposals);
  const [newProposalTitle, setNewProposalTitle] = useState('');
  const [newProposalDescription, setNewProposalDescription] = useState('');
  const [users, setUsers] = useState(initialUsers);

  const currentUser = users.find(user => user.name === 'User1'); // Mevcut kullanıcıyı belirleyin

  const handleAddProposal = () => {
    if (newProposalTitle.trim() && newProposalDescription.trim()) {
      setProposals([...proposals, {
        title: newProposalTitle,
        description: newProposalDescription,
        votes: { yes: 0, no: 0 },
        comments: []
      }]);
      setNewProposalTitle('');
      setNewProposalDescription('');
    }
  };

  const handleVote = (index, voteType) => {
    const updatedProposals = [...proposals];
    if (voteType === 'yes') {
      updatedProposals[index].votes.yes += 1;
    } else {
      updatedProposals[index].votes.no += 1;
    }
    setProposals(updatedProposals);

    const updatedUsers = users.map(user => {
      if (user.name === currentUser.name) {
        return { ...user, points: user.points + 1 }; // Oylama için puan
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleAddComment = (index, comment) => {
    const updatedProposals = [...proposals];
    updatedProposals[index].comments.push(comment);
    setProposals(updatedProposals);
  };

  return (
    <div className="dao-page">
      <h1>Topluluk Önerileri ve Oylamalar</h1>
      {proposals.map((proposal, index) => (
        <div key={index} className="proposal">
          <h2>{proposal.title}</h2>
          <p>{proposal.description}</p>
          <div className="votes">
            <button onClick={() => handleVote(index, 'yes')}>Evet ({proposal.votes.yes})</button>
            <button onClick={() => handleVote(index, 'no')}>Hayır ({proposal.votes.no})</button>
          </div>
          <Comments
            comments={proposal.comments}
            onAddComment={(comment) => handleAddComment(index, comment)}
          />
        </div>
      ))}
      <div className="new-proposal">
        <h3>Yeni Öneri Oluştur</h3>
        <input
          type="text"
          value={newProposalTitle}
          onChange={(e) => setNewProposalTitle(e.target.value)}
          placeholder="Öneri Başlığı"
        />
        <textarea
          value={newProposalDescription}
          onChange={(e) => setNewProposalDescription(e.target.value)}
          placeholder="Öneri Açıklaması"
        ></textarea>
        <button onClick={handleAddProposal}>Öneri Ekle</button>
      </div>
    </div>
  );
};

export default DAO;
