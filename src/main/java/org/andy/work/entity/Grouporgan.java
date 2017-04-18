package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

/**
 * Approval created by tianlei
 */
@Entity
@Table(name = "t_grouporgan", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Grouporgan implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private Group GroupID;
	@JsonProperty
	private Organ Organ;

	public Grouporgan() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	@JsonIgnore
	public int getID() {
		return this.ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="Organ", nullable = true)
	@JsonIgnore
	public Organ getOrgan() {
		return this.Organ;
	}

	public void setOrgan(Organ Organ) {
		this.Organ = Organ;
	}


	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="GroupID", nullable = true)
	@JsonIgnore
	public Group getGroupID() {
		return this.GroupID;
	}

	public void setGroupID(Group GroupID) {
		this.GroupID = GroupID;
	}


}
