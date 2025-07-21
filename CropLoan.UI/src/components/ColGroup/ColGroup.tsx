const ColGroup = () => {
  return (
    <colgroup>
      <col style={{ width: "8%" }} /> {/* RegisterNumber */}
      <col style={{ width: "10%" }} /> {/* CustomerName */}
      <col style={{ width: "11%" }} /> {/* LoanNumber */}
      <col style={{ width: "12%" }} /> {/* AccountNumber - wider */}
      <col style={{ width: "10%" }} /> {/* CropType */}
      <col style={{ width: "6%" }} /> {/* Acre */}
      <col style={{ width: "6%" }} /> {/* FarmerType */}
      <col style={{ width: "8%" }} /> {/* ReadyCash */}
      <col style={{ width: "8%" }} /> {/* Fertilizer */}
      <col style={{ width: "8%" }} /> {/* Seed */}
      <col style={{ width: "8%" }} /> {/* Insecticide */}
      <col style={{ width: "8%" }} /> {/* ThozhuUram */}
      <col style={{ width: "8%" }} /> {/* GrandTotal */}
      <col style={{ width: "8%" }} /> {/* TotalAmount */}
      <col style={{ width: "5%" }} /> {/* Save - narrow */}
      <col style={{ width: "5%" }} /> {/* Remove/Delete - narrow */}
    </colgroup>
  );
};

export default ColGroup;
