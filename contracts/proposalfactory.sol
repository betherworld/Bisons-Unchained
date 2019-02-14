pragma solidity >=0.4.22 <0.6.0;
import "./voting.sol";

// This contract handles the creation and mantaining of proposals.
// Additional voting logic can be found in voting.sol.
contract ProposalFactory is Voting{
    struct Proposal {
        string name;
        bool active;
        uint countVotes;
    }
    uint proposalCost = 1;
    // An array containing all (active and inactive) proposals. The index represents
    // a basic ID of a specific proposal.
    Proposal[] public proposals;

    // Handle the request of non existing proposals.
    event InvalidProposal(string _name);

    // Mapping between name of proposal to the assigned ID.
    mapping (bytes32 => uint) public nameToId;
    
    // Returns the length of proposals.
    function getProposalsLength() external view returns(uint){
        return proposals.length;
    }
    
    // Returns fields of specific proposal based on the index.
    function getProposal(uint _index) external view returns(string, bool, uint) {
        Proposal memory current = proposals[_index];
        return (current.name, current.active, current.countVotes);
    }

    // A proposal is created by choosing a name which will be mapped to a unique ID.
    // More fields could be added like a description. Note that any user may make use
    // of this function which is probably not desired. The next version would contain
    // some kind of authorisation functions.
    function createProposal(string memory _name) public {
        Voter storage sender = addressToVoter[msg.sender];
        require(sender.countVotes >= proposalCost);
        _decreaseVotes(proposalCost);
        uint id = proposals.push(Proposal(_name, true, 0)) - 1;
        bytes32  conv = stringToBytes32(_name);
        nameToId[conv] = id;
    }
    
    // Sender chooses by name the proposal he'd like to vote for and and also chooses 
    // the amount of votes.
    function payVotes(string memory _name, uint _voteCount) public {
        Voter storage sender = addressToVoter[msg.sender];
        
        require(_voteCount <= sender.countVotes);
        
        bytes32  conv = stringToBytes32(_name);
        uint id = nameToId[conv];
        Proposal storage curProposal = proposals[id];
        
        curProposal.countVotes += _voteCount;
        sender.countVotes -= uint16(_voteCount);
    }
    
    

    // Can be called to finish the voting. Returns the name of the"winner" with
    // the most votes and makes it inactive. We don't remove it from the array
    // as we rely on the basic ID based on the index of the array.
    function endVoting() external returns (string memory) {
        require(proposals.length > 0);
        uint id = _findWinner();
        Proposal storage winner = proposals[id];
        winner.active = false;
        return winner.name;
    }

    // Iterate over all proposals and return ID of winner.
    function _findWinner() private view returns (uint){
        uint max = 0;
        uint id = 0;
        for(uint i = 0; i < proposals.length; i++){
            if(proposals[i].countVotes > max){
                max = proposals[i].countVotes;
                id = i;
            }
        }

        return id;
    }

    // Return fields of specific proposal. Checks for existance of input name first.
    function lookAtProposal(string memory _name) public returns (bool, uint) {
        uint i = 0;
        bytes32 con1 = keccak256(abi.encodePacked(proposals[i].name));
        bytes32 con2 = keccak256(abi.encodePacked(_name));

        while(con1 != con2 && i < proposals.length ){
            i++;
        }
        if(keccak256(abi.encodePacked(proposals[i].name)) != keccak256(abi.encodePacked(_name))){
            emit InvalidProposal(_name);
            return;
        }


        bytes32  conv = stringToBytes32(_name);

        uint id = nameToId[conv];
        Proposal memory curProposal = proposals[id];
        bool result1 = curProposal.active;
        uint result2 = curProposal.countVotes;
        return (result1, result2);
    }

    // Helper function. Converts strings to bytes32 in order to allow mapping.
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        // Necessary for the helper function.
        assembly {
            result := mload(add(source, 32))
        }
    }
}